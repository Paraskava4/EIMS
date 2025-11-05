import { MdDelete } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

export const MSG =
  {
    MODAL_CLOSE:
      "Do you want to close the dialog? Changes will be lost.",
    HEADER_TITLE:
      {
        CONFIRM:
          (
            <p className="flex_center mt-4 pt-2">
              <MdDelete color="red" />
              <span className="ml-2">
                Are
                you
                sure?
              </span>
            </p>
          ),
        LOGOUT:
          (
            <p className="flex_center mt-4 pt-2">
              <IoIosWarning color="#000000" />
              <span className="ml-2">
                Logout
              </span>
            </p>
          ),
      },
    BODY_TXT:
      {
        DELETE:
          "Are you sure you want to delete this entry? You Can't undo this action.",
        LOGOUT:
          "Are you sure you want to logout?",
      },
  };
