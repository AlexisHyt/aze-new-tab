import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import { PopupButton } from "~components/popup/PopupButton";
import { PopupInput } from "~components/popup/PopupInput";
import { darkenColor, generateUuidV4 } from "~lib/helpers";
import {
  CARD_LINK_BG_COLOR__DEFAULT,
  CARD_LINK_TEXT_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import type { IGroup } from "~scripts/popup/types";
import {
  ACTIVE_GROUP,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  GROUPS,
} from "~scripts/storage";

export const GroupSelector = () => {
  const [groups, setGroups] = useStorage(GROUPS, []);
  const [activeGroup, setActiveGroup] = useStorage(ACTIVE_GROUP, {} as IGroup);
  const [linkCardBackgroundColor] = useStorage(
    CARD_LINK_BG_COLOR,
    CARD_LINK_BG_COLOR__DEFAULT,
  );
  const [linkCardTextColor] = useStorage(
    CARD_LINK_TEXT_COLOR,
    CARD_LINK_TEXT_COLOR__DEFAULT,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = async (group: IGroup) => {
    await setActiveGroup(group);
    setIsDropdownOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={isOpen} handler={handleOpen} placeholder={""}>
        <DialogHeader placeholder={""}>Create group</DialogHeader>
        <DialogBody placeholder={""}>
          <form
            className={`flex flex-col gap-2 w-1/2 m-auto justify-center items-center`}
            onSubmit={async (e) => {
              e.preventDefault();

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement);
              const addGroup = {
                id: generateUuidV4(),
                name: formData.get("addGroup-name") as string,
                logo: formData.get("addGroup-logo") as string,
              };

              // Update custom search engines
              const groupsCopy = [...groups];
              groupsCopy.push(addGroup);
              await setGroups(groupsCopy);
              await setActiveGroup(addGroup);

              setIsOpen(false);
            }}
          >
            <PopupInput
              type={"text"}
              id={"form-addGroup-name"}
              name={"addGroup-name"}
              placeholder={"Name"}
            />
            <PopupInput
              type={"text"}
              id={"form-addGroup-logo"}
              name={"addGroup-logo"}
              placeholder={"Logo"}
            />
            <PopupButton
              type={"submit"}
              text={"Create"}
              bgColor={"bg-green-500"}
              hoverBgColor={"hover:bg-green-600"}
            />
          </form>
        </DialogBody>
      </Dialog>
      <div ref={containerRef}>
        {groups.length === 0 && (
          <button
            type="button"
            className="background-hover-reactive transition-all duration-300 border-none rounded-full outline-none text-lg py-2 px-6"
            style={
              {
                color: linkCardTextColor,
                "--bg-color": linkCardBackgroundColor,
                "--bg-color-hover": darkenColor(linkCardBackgroundColor, 0.1),
              } as React.CSSProperties
            }
            onClick={() => setIsOpen(true)}
          >
            Create group
          </button>
        )}
        {groups.length > 0 && (
          <>
            <button
              type="button"
              className="background-hover-reactive border-none rounded-full outline-none text-lg py-2 px-6 flex items-center gap-2"
              style={
                {
                  color: linkCardTextColor,
                  "--bg-color": linkCardBackgroundColor,
                  "--bg-color-hover": darkenColor(linkCardBackgroundColor, 0.1),
                } as React.CSSProperties
              }
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {activeGroup.logo && (
                <img
                  src={activeGroup.logo}
                  alt={activeGroup.name}
                  className={`h-4`}
                />
              )}
              {activeGroup.name}
            </button>
            {isDropdownOpen && (
              <div className="absolute rounded-md bg-black mt-2 w-auto flex flex-col gap-2 z-50">
                {groups.map((group, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-white  shadow-md px-5 py-4 text-left hover:bg-gray-900 text-lg flex items-center gap-2`}
                    onClick={() => {
                      handleClick(group);
                    }}
                  >
                    {group.logo && (
                      <img
                        src={group.logo}
                        alt={group.name}
                        className={`h-3`}
                      />
                    )}
                    {group.name}
                    {group.name === activeGroup.name ? (
                      <span className={`bg-blue-500 rounded-md px-1`}>
                        active
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};
