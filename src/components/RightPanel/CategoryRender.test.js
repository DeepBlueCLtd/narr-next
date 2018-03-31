import { Col } from "reactstrap";
import { WrapStore } from "../../TestUtils";
import { mount } from "enzyme";
import CategoryRender from "./CategoryRender";
import EntryRender from "./EntryRender";
import React from "react";

describe("CategoryRender", () => {
  let props;
  let mounted;
  const render = () => {
    if (!mounted) {
      mounted = mount(
        <WrapStore>
          <CategoryRender {...props} />
        </WrapStore>
      );
    }
    return mounted;
  };

  beforeEach(() => {
    props = {
      addEntry: () => null,
      category: {
        name: "MyCategory",
        priority: "High",
        created: "",
        mType: "myType",
        privacy: "---",
        entries: [
          {
            id: "firstEntry",
            name: "firstEntryName",
            priority: "High",
            fields: []
          },
          {
            id: "secondEntry",
            name: "secondEntryName",
            priority: "Low",
            fields: []
          }
        ]
      },
      collapse: false
    };
    mounted = undefined;
  });

  it("renders All Two Entries", () => {
    const rendered = render();
    expect(rendered.find(EntryRender)).toHaveLength(2);
  });

  it("skips hidden fields", () => {
    props.category = {
      name: "MyCategory",
      priority: "High",
      created: "",
      mType: "myType",
      privacy: "---",
      entries: [
        {
          id: "firstEntry",
          name: "firstEntryName",
          priority: "High",
          fields: []
        },
        {
          id: "secondEntry",
          name: "secondEntryName",
          priority: "Low",
          fields: [],
          hidden: true
        }
      ]
    };
    const rendered = render();
    expect(rendered.find(EntryRender)).toHaveLength(1);
  });

  describe("Collapse Logic", () => {
    it("renders collapsed when extend collapse is true", () => {
      props.collapse = true;
      const rendered = render();
      expect(
        rendered
          .find(Col)
          .first()
          .prop("lg")
      ).toBe(12);
    });

    it("renders extended when collapse is false", () => {
      props.collapse = false;
      const rendered = render();
      expect(
        rendered
          .find(Col)
          .first()
          .prop("lg")
      ).toBe(6);
    });
  });

  it("renders Entry Names on Button", () => {
    const rendered = render();
    const Entries = rendered.find(EntryRender);
    expect(Entries.at(0).text()).toEqual("firstEntryName");
    expect(Entries.at(1).text()).toEqual("secondEntryName");
  });
});
