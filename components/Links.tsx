import { useStorage } from "@plasmohq/storage/hook";
import type React from "react";
import { Fragment, useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";
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
  CATEGORY_BG_COLOR__DEFAULT,
  CATEGORY_TEXT_COLOR__DEFAULT,
} from "~scripts/defaultValues";
import type { ICategory, IGroup, ILink } from "~scripts/popup/types";
import {
  ACTIVE_GROUP,
  CARD_LINK_BG_COLOR,
  CARD_LINK_TEXT_COLOR,
  CATEGORIES,
  CATEGORY_BG_COLOR,
  CATEGORY_TEXT_COLOR,
  LINKS,
} from "~scripts/storage";

export const Links = () => {
  const [activeGroup] = useStorage(ACTIVE_GROUP, {} as IGroup);
  const [categories, setCategories] = useStorage(CATEGORIES, [] as ICategory[]);
  const [links, setLinks] = useStorage(LINKS, [] as ILink[]);
  const [categoryBackgroundColor] = useStorage(
    CATEGORY_BG_COLOR,
    CATEGORY_BG_COLOR__DEFAULT,
  );
  const [categoryTextColor] = useStorage(
    CATEGORY_TEXT_COLOR,
    CATEGORY_TEXT_COLOR__DEFAULT,
  );
  const [linkCardBackgroundColor] = useStorage(
    CARD_LINK_BG_COLOR,
    CARD_LINK_BG_COLOR__DEFAULT,
  );
  const [linkCardTextColor] = useStorage(
    CARD_LINK_TEXT_COLOR,
    CARD_LINK_TEXT_COLOR__DEFAULT,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const removeCategory = async (category: ICategory) => {
    const categoriesClone = [...categories];
    const newCategories = categoriesClone.filter((c) => c.id !== category.id);
    await setCategories(newCategories);
  };
  const removeLink = async (link: ILink) => {
    const linksClone = [...links];
    const newLinks = linksClone.filter((c) => c.id !== link.id);
    await setLinks(newLinks);
  };

  return (
    <Fragment>
      <Dialog open={isOpen} handler={handleOpen} placeholder={""}>
        <DialogHeader placeholder={""}>Create shortcut</DialogHeader>
        <DialogBody placeholder={""}>
          <form
            className={`flex flex-col gap-2 w-1/2 m-auto justify-center items-center`}
            onSubmit={async (e) => {
              e.preventDefault();

              // Get form data
              const formData = new FormData(e.target as HTMLFormElement);
              const addLink = {
                id: generateUuidV4(),
                name: formData.get("link-name") as string,
                link: formData.get("link-link") as string,
                logo:
                  (formData.get("link-logo") as string) ||
                  `${formData.get("link-link")}/favicon.ico` ||
                  "",
                categoryId: selectedCategory.id,
              };

              // Update custom search engines
              const linksCopy = [...links];
              linksCopy.push(addLink);
              await setLinks(linksCopy);

              setIsOpen(false);
              setSelectedCategory(null);
            }}
          >
            <PopupInput
              type={"text"}
              id={"form-link-name"}
              name={"link-name"}
              placeholder={"Name"}
            />
            <PopupInput
              type={"text"}
              id={"form-link-link"}
              name={"link-link"}
              placeholder={"Link"}
            />
            <PopupInput
              type={"text"}
              id={"form-link-logo"}
              name={"link-logo"}
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
      {categories
        .filter((category) => category.groupId === activeGroup.id)
        .map((category, index) => (
          <div key={index}>
            <div
              className={`relative flex items-center gap-2 text-white text-lg font-bold mt-5 mb-4 w-fit group`}
            >
              {category.logo && (
                <img
                  src={category.logo}
                  alt={category.name}
                  className={`h-6`}
                />
              )}
              <p
                className={`background-hover-reactive px-2 rounded`}
                style={
                  {
                    color: categoryTextColor,
                    "--bg-color": categoryBackgroundColor,
                    "--bg-color-hover": darkenColor(
                      categoryBackgroundColor,
                      0.1,
                    ),
                  } as React.CSSProperties
                }
              >
                {category.name}
              </p>
              <LuX
                className={`background-hover-reactive invisible group-hover:visible cursor-pointer absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-4`}
                style={
                  {
                    color: categoryTextColor,
                    "--bg-color": categoryBackgroundColor,
                    "--bg-color-hover": darkenColor(
                      categoryBackgroundColor,
                      0.1,
                    ),
                  } as React.CSSProperties
                }
                onClick={() => removeCategory(category)}
              />
            </div>
            <div className={`flex gap-4`}>
              {links
                .filter((link) => link.categoryId === category.id)
                .map((link, index) => (
                  <a
                    href={link.link}
                    key={index}
                    className={`background-hover-reactive relative size-24 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-around items-center cursor-pointer group`}
                    style={
                      {
                        "--bg-color": linkCardBackgroundColor,
                        "--bg-color-hover": darkenColor(
                          linkCardBackgroundColor,
                          0.1,
                        ),
                      } as React.CSSProperties
                    }
                  >
                    {link.logo && (
                      <img src={link.logo} alt={link.name} className={`h-12`} />
                    )}
                    <p style={{ color: linkCardTextColor }}>{link.name}</p>
                    <LuX
                      className={`background-hover-reactive invisible group-hover:visible cursor-pointer absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-4`}
                      style={
                        {
                          color: categoryTextColor,
                          "--bg-color": linkCardBackgroundColor,
                          "--bg-color-hover": darkenColor(
                            linkCardBackgroundColor,
                            0.1,
                          ),
                        } as React.CSSProperties
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeLink(link);
                      }}
                    />
                  </a>
                ))}
              <div
                className={`background-hover-reactive size-24 hover:-translate-y-1 transition-all duration-300 text-white flex justify-center items-center text-6xl cursor-pointer`}
                style={
                  {
                    "--bg-color": linkCardBackgroundColor,
                    "--bg-color-hover": darkenColor(
                      linkCardBackgroundColor,
                      0.1,
                    ),
                  } as React.CSSProperties
                }
              >
                <LuPlus
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};
