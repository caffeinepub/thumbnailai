import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Shape = {
    id : Text;
    shapeType : { #rectangle; #circle; #triangle };
    width : Nat;
    height : Nat;
    bgColor : Text;
    borderSize : Nat;
    borderColor : Text;
    rotation : ?Nat;
    text : ?Text;
  };

  type ThumbnailConfig = {
    width : Nat;
    height : Nat;
    bgColor : Text;
    borderSize : Nat;
    borderColor : Text;
    shapes : [Shape];
    text : ?Text;
    createdAt : Int;
    updatedAt : ?Int;
  };

  type Template = {
    id : Text;
    name : Text;
    config : ThumbnailConfig;
    createdAt : Int;
    updatedAt : ?Int;
  };

  let userTemplatesStore = Map.empty<Principal, List.List<Template>>();

  func getUserTemplates(user : Principal) : List.List<Template> {
    switch (userTemplatesStore.get(user)) {
      case (?templates) { templates };
      case (null) {
        let emptyTemplates = List.empty<Template>();
        userTemplatesStore.add(user, emptyTemplates);
        emptyTemplates;
      };
    };
  };

  func getTemplateById(templates : List.List<Template>, templateId : Text) : ?Template {
    templates.values().find(func(template) { template.id == templateId });
  };

  func generateUniqueId() : Text {
    let timestamp = Time.now().toText();
    let randomString = "ic-thumbnails"; // Add better random string generation
    timestamp.concat(randomString);
  };

  func mergeShape(_old : ?Shape, new : ?Shape) : ?Shape {
    switch (new) {
      case (?n) {
        if (n.id == "" and new == null) { _old } else { new };
      };
      case (null) { _old };
    };
  };

  func mergeConfig(_old : ?ThumbnailConfig, new : ?ThumbnailConfig) : ?ThumbnailConfig {
    switch (new, _old) {
      case (?n, _) { if (n.shapes.size() == 0) { _old } else { new } };
      case (null, ?o) { ?o };
      case (null, null) { null };
    };
  };

  func mergeTemplates(_old : ?Template, new : ?Template) : ?Template {
    switch (new, _old) {
      case (?n, _) { if (n.id == "") { _old } else { new } };
      case (null, ?o) { ?o };
      case (null, null) { null };
    };
  };

  public query ({ caller }) func getTemplates() : async [Template] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access templates");
    };
    getUserTemplates(caller).toArray();
  };

  public query ({ caller }) func getTemplate(id : Text) : async Template {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access templates");
    };
    switch (getTemplateById(getUserTemplates(caller), id)) {
      case (?template) { template };
      case (null) { Runtime.trap("Template not found") };
    };
  };

  public shared ({ caller }) func createTemplate(name : Text, config : ThumbnailConfig) : async Template {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create templates");
    };

    if (name == "") {
      Runtime.trap("Template name cannot be empty");
    };

    let newTemplate : Template = {
      id = generateUniqueId();
      name;
      config;
      createdAt = Time.now();
      updatedAt = null;
    };

    let templates = getUserTemplates(caller);
    templates.add(newTemplate);

    userTemplatesStore.add(caller, templates);

    newTemplate;
  };

  public shared ({ caller }) func deleteTemplate(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete templates");
    };

    let templates = getUserTemplates(caller);
    let filteredTemplates = templates.filter(func(template) { template.id != id });

    if (filteredTemplates.size() == templates.size()) {
      Runtime.trap("Template not found");
    };

    userTemplatesStore.add(caller, filteredTemplates);
  };
};
