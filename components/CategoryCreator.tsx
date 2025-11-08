import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { useState } from "react";
import { PopupButton } from "~components/popup/PopupButton";
import { PopupInput } from "~components/popup/PopupInput";
import { darkenColor, generateUuidV4 } from "~lib/helpers";
import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "~node_modules/@material-tailwind/react";
import {
  CARD_LINK_BG_COLOR__DEFAULT,
  CARD_LINK_TEXT_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import type { ICategory, IGroup } from "~scripts/popup/types";
import {
  ACTIVE_GROUP,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORIES,
} from "~scripts/storage";

export const CategoryCreator = () => {
  const [categories, setCategories] = useStorage(CATEGORIES, [] as ICategory[]);
  const [activeGroup] = useStorage(ACTIVE_GROUP, {} as IGroup);
  const [linkCardBackgroundColor] = useStorage(
    CARD_LINK_BG_COLOR,
    CARD_LINK_BG_COLOR__DEFAULT,
  );
  const [linkCardTextColor] = useStorage(
    CARD_LINK_TEXT_COLOR,
    CARD_LINK_TEXT_COLOR__DEFAULT,
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Dialog open={isOpen} handler={handleOpen} placeholder={""}>
        <DialogHeader placeholder={""}>Create new category</DialogHeader>
        <DialogBody placeholder={""}>
          <form
            className={`flex flex-col gap-2 w-1/2 m-auto justify-center items-center`}
            onSubmit={async (e) => {
              e.preventDefault();

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement);
              const addCategory = {
                id: generateUuidV4(),
                name: formData.get("category-name") as string,
                logo: formData.get("category-logo") as string,
                groupId: activeGroup.id,
              };

              // Update custom search engines
              categories.push(addCategory);
              await setCategories(categories);

              setIsOpen(false);
            }}
          >
            <PopupInput
              type={"text"}
              id={"form-category-name"}
              name={"category-name"}
              placeholder={"Name"}
            />
            <PopupInput
              type={"text"}
              id={"form-category-logo"}
              name={"category-logo"}
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
      <button
        type="button"
        className="background-hover-reactive transition-all duration-300 border-none text-white rounded-full outline-none text-lg py-2 px-6"
        style={
          {
            color: linkCardTextColor,
            "--bg-color": linkCardBackgroundColor,
            "--bg-color-hover": darkenColor(linkCardBackgroundColor, 0.1),
          } as React.CSSProperties
        }
        onClick={handleOpen}
      >
        Create category
      </button>
    </div>
  );
};
