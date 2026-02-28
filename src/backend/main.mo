import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Lead = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Lead {
    public func compareByEmail(lead1 : Lead, lead2 : Lead) : Order.Order {
      Text.compare(lead1.email, lead2.email);
    };
  };

  public type SiteConfig = {
    bookingUrl : Text;
  };

  public type Init = {
    admin : Principal;
    bookingUrl : Text;
  };

  // Persistent state
  var admin : Principal = Principal.fromText("2vxsx-fae");
  var siteConfig : SiteConfig = {
    bookingUrl = "";
  };
  let leads = List.empty<Lead>();

  // Initialize actor
  public shared ({ caller }) func init(init : Init) : async () {
    admin := init.admin;
    siteConfig := {
      bookingUrl = init.bookingUrl;
    };
  };

  // Lead capture
  public shared ({ caller }) func submitLead(name : Text, email : Text, message : Text) : async () {
    let lead : Lead = {
      name;
      email;
      message;
      timestamp = 0;
    };
    leads.add(lead);
  };

  // Get all leads (admin only)
  public query ({ caller }) func getLeads() : async [Lead] {
    if (caller != admin) {
      Runtime.trap("Access denied: admin only");
    };
    leads.toArray();
  };

  // Get leads sorted by email (admin only)
  public query ({ caller }) func getLeadsSortedByEmail() : async [Lead] {
    if (caller != admin) {
      Runtime.trap("Access denied: admin only");
    };
    leads.toArray().sort(Lead.compareByEmail);
  };

  // Site config
  public query ({ caller }) func getSiteConfig() : async SiteConfig {
    siteConfig;
  };

  public shared ({ caller }) func updateBookingUrl(url : Text) : async () {
    if (caller != admin) {
      Runtime.trap("Access denied: admin only");
    };
    siteConfig := {
      bookingUrl = url;
    };
  };
};
