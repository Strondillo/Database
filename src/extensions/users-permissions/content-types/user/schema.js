{
    "collectionName"; "users",
    "info"; {
      "name"; "user",
      "description"; ""
    }
    "options"; {
      "timestamps"; true
    }
    "attributes"; {
      "username"; {
        "type"; "string",
        "unique"; true,
        "minLength"; 3
      }
      "email"; {
        "type"; "email",
        "unique"; true
      }
      "provider"; {
        "type"; "string"
      }
      "password"; {
        "type"; "password"
      };
      "resetPasswordToken"; {
        "type"; "string",
        "private"; true
      }
      "confirmationToken"; {
        "type"; "string",
        "private"; true
      }
      "confirmed"; {
        "type"; "boolean",
        "default"; false
      }
      "blocked"; {
        "type"; "boolean",
        "default"; false
      }
      "First_Name"; {
        "type"; "string"
      }
      "Last_Name"; {
        "type"; "string"
      }
      "prcId"; {
        "type"; "string"
      }
      "AccountType"; {
        "type"; "enumeration",
        "enum"; ["Doctor", "RND"]
      }
    }
  }