const {
  reducer,
  createNewStory,
  createNewEvent,
  updateEvent,
  updateEventOrder,
  clearState,
  deleteEvent
} = require("./reducer.js");

let testStoryList = [
  {
    story_id: 1,
    user_id: 1,
    story_title: "My Proposal",
    tags: [
      {
        tag_id: 1,
        tag_str: "Stuart Harper"
      },
      {
        tag_id: 2,
        tag_str: "Summer Harper"
      },
      {
        tag_id: 3,
        tag_str: "Provo, Utah"
      },
      {
        tag_id: 4,
        tag_str: "Orem, Utah"
      }
    ]
  },
  {
    story_id: 2,
    user_id: 1,
    story_title: "Mary Cook, Handcart Pioneer",
    tags: [
      {
        tag_id: 5,
        tag_str: "Mary Cook"
      },
      {
        tag_id: 6,
        tag_str: "Convert"
      },
      {
        tag_id: 7,
        tag_str: "Pioneer"
      },
      {
        tag_id: 8,
        tag_str: "Scotland"
      }
    ]
  }
];

let testStory = [
  {
    story_id: 2,
    user_id: 1,
    story_title: "Mary Cook, Handcart Pioneer",
    tags: [
      {
        tag_id: 5,
        tag_str: "Mary Cook"
      },
      {
        tag_id: 6,
        tag_str: "Convert"
      },
      {
        tag_id: 7,
        tag_str: "Pioneer"
      },
      {
        tag_id: 8,
        tag_str: "Scotland"
      }
    ],
    events: [
      {
        event_id: 1,
        event_num: 0,
        event_title: "Mary Cook is Born",
        date: "25 February 1823",
        location: "Shettleston, Lanarkshire, Scotland",
        event_txt:
          "Mary cook was born in Shettleston, Lanarkshire, Scotland to Adam Cook and Elisabeth Gilmour. She was the 7th of 11 children. Her father apparently was in the military , and had received a medal for his service in the Battle of Waterloo.",
        media: [
          {
            media_id: 1,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-301-41540-135-27/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 2,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-303-45428-574-53/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 3,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-300-45428-733-1/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 4,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-300-48239-1135-19/scale?width=800&ctx=ArtCtxPublic&angle=0"
          }
        ]
      },
      {
        event_id: 2,
        event_num: 1,
        event_title: "Mary Cook is Married to John Brown",
        date: "8 April 1843",
        location: "Baillieston, Old Monkland, Lanark, Scotland",
        event_txt:
          "Mary and John were married at Baillieston, Old Monkland, Lanark, Scotland. Not much is known of their relationship except they had four children.",
        media: []
      },
      {
        event_id: 3,
        event_num: 2,
        event_title: 'Mary Cook converts to "Mormonism"',
        date: "13 November 1848",
        location: "Baillieston, Old Monkland, Lanark, Scotland",
        event_txt:
          "While in Scotland, a missionary from The Church of Jesus Christ of Latter-day Saints (aka Mormon) named Elder John Shields taught her the restored gospel. She and her children came to believe it was true. Though her husband objected, she was baptized into the church. Sometime after 1851, her husband in a rage abandoned her and her four children when she expressed her desire to go to America to be with the other Latter-day Saints.",
        media: [
          {
            media_id: 5,
            media_type: "pic",
            media_ref:
              "https://images.findagrave.com/photos/2013/59/18326820_136220556820.jpg"
          }
        ]
      },
      {
        event_id: 4,
        event_num: 3,
        event_title: "Mary Cook and her children leave Scotland ",
        date: "28 March 1857",
        location: "Trafalgar Dock",
        event_txt:
          'After having lost all her belongings when her husband left her it took her years for her to save up the money for passage for her and her four children (William age 13, Walter age 10, Adam age 8, and David age 5). They left liverpool on the "George Washington".',
        media: [
          {
            media_id: 6,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 7,
            media_type: "pic",
            media_ref:
              "http://gordon.buttars.me/familyhistory/Davis,%20Esther/Sailing%20Ship.jpg"
          }
        ]
      },
      {
        event_id: 5,
        event_num: 4,
        event_title: "Mary Cook arrives in America",
        date: "20 April 1857",
        location: "Boston Harbor Shipyard & Marina",
        event_txt:
          "After almost a month at sea on a very difficult journey, Mary and her children arrive in Boston. They immediately begin working towards heading west to be with the Saints.",
        media: [
          {
            media_id: 8,
            media_type: "pic",
            media_ref:
              "http://gordon.buttars.me/familyhistory/Davis,%20Esther/CentralWharfBostonHarbor.jpg"
          }
        ]
      },
      {
        event_id: 6,
        event_num: 5,
        event_title: "Mary Cook joins a handcart company",
        date: "1857",
        location: "Iowa City",
        event_txt:
          'She joins a handcart company in Iowa City, and begins the long trek west to Salt Lake City. "The trip was a hard one in all respects." She had her four children to care for also with no husband to help. "but hers was a spirit that was a stranger to complaint and proud indeed she was to accomplish the task."',
        media: [
          {
            media_id: 9,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 10,
            media_type: "pic",
            media_ref:
              "http://mediad.publicbroadcasting.net/p/kuer/files/styles/x_large/public/201407/handcarts.jpg"
          }
        ]
      },
      {
        event_id: 7,
        event_num: 6,
        event_title: "Mary Cook arrives in Salt Lake City",
        date: "before september 1857",
        location: "Salt Lake City",
        event_txt:
          "After the long journey west she finally arrives in Salt Lake City with her family, grateful to be finally united with the people of her faith.",
        media: [
          {
            media_id: 11,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 12,
            media_type: "pic",
            media_ref:
              "http://c8.alamy.com/comp/A0WCYJ/salt-lake-city-utah-usa-mormon-settlement-wide-angle-panorama-vista-A0WCYJ.jpg"
          }
        ]
      },
      {
        event_id: 8,
        event_num: 7,
        event_title: "Mary Cook Marries Alexander Gellespie",
        date: "20 September 1857",
        location: "Salt Lake City",
        event_txt:
          "Mary Cook Marries Alexander Gellespie. They are married by the Prophet and president of the church Brigham Young in his office, since the temple, and its predecessor the endowment house had not yet been built. She was Alexanders third wife.",
        media: [
          {
            media_id: 13,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-301-41540-135-27/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 14,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-303-45428-574-53/scale?width=800&ctx=ArtCtxPublic&angle=0"
          },
          {
            media_id: 15,
            media_type: "pic",
            media_ref:
              "https://www.mormonnewsroom.org/media/orig/brigham-young.jpg"
          }
        ]
      },
      {
        event_id: 9,
        event_num: 8,
        event_title: "Mary Cook moves to provo",
        date: "1858",
        location: "Provo, Utah",
        event_txt:
          "Mary cook with her family was called to help settle in the Provo settlement there she had her fifth child Mary.",
        media: [
          {
            media_id: 16,
            media_type: "pic",
            media_ref:
              "https://images.prod.meredith.com/product/bd471cc6c77e9b539854a4cdc639999a/1513729424077/l/mormon-encampment-1858-nthe-mormon-encampment-at-provo-city-utah-colored-wood-engraving-1858-rolled-canvas-art-24-x-36"
          }
        ]
      },
      {
        event_id: 10,
        event_num: 9,
        event_title: "Mary Cook moves back to Salt Lake",
        date: "1860",
        location: "Salt Lake City",
        event_txt:
          "After two years Mary and her family moved back to Salt Lake City. There she had her sixth child, Agnes.",
        media: []
      },
      {
        event_id: 11,
        event_num: 10,
        event_title: "Mary Cook moves to Saint George",
        date: "1862",
        location: "Saint George",
        event_txt:
          "Mary cook with her family was called to help settle in Saint George, also known as the Dixie Mission. There she had her seventh child Alexander. There she would stay for five more years.",
        media: [
          {
            media_id: 17,
            media_type: "pic",
            media_ref:
              "https://history.lds.org/bc/content/images/library/exhibits/st-george-tabernacle/st-george-1890-uhs.jpg"
          }
        ]
      },
      {
        event_id: 12,
        event_num: 11,
        event_title: "Mary Cook returns to her beloved Salt Lake City",
        date: "1867",
        location: "Salt Lake City",
        event_txt:
          "Mary Cook and her husband had fulfilled their missions and assignments to help settle Provo and Saint George, and having been released, moved back to Salt Lake City. At this time she was 44-45, and she would remain in Salt Lake for the rest of her life. It was noted that she had many friends and performed much service in the area.",
        media: [
          {
            media_id: 18,
            media_type: "pic",
            media_ref:
              "http://teachingamericanhistory.org/files/2016/09/getty.jpg"
          }
        ]
      },
      {
        event_id: 13,
        event_num: 12,
        event_title: "Mary Cook dies and is buried",
        date: "7 June 1903",
        location: "Salt Lake City Cemetery",
        event_txt:
          "Mary Cook dies at the age of 80. She was buried in the Salt Lake City Cemetery. She left behind an immense legacy of faith to her children and grandchildren. She was willing, time and time again to sacrifice all she had and all she knew for what she believed was true. I am honored to be her great, great, great, great, grandchild",
        media: [
          {
            media_id: 19,
            media_type: "pic",
            media_ref:
              "https://www.familysearch.org/dzpatron/v1/TH-303-48239-97-22/scale?width=800&ctx=ArtCtxPublic&angle=0"
          }
        ]
      }
    ]
  }
];

let initialState = {
  storiesArray: [],
  currentStoryOrig: [],
  currentStory: [],
  currentEventOrig: {},
  currentEvent: {},
  currentEventIndex: 0,
  importedMedia: []
};

let initialState1 = {
  storiesArray: testStoryList.slice(),
  currentStoryOrig: testStory.slice(),
  currentStory: testStory.slice(),
  currentEventOrig: {},
  currentEvent: {},
  currentEventIndex: 0,
  importedMedia: []
};
let initialState2 = {
  storiesArray: testStoryList.slice(),
  currentStoryOrig: testStory.slice(),
  currentStory: testStory.slice(),
  currentEventOrig: {},
  currentEvent: {},
  currentEventIndex: 0,
  importedMedia: []
};
let initialState3 = {
  storiesArray: testStoryList.slice(),
  currentStoryOrig: testStory.slice(),
  currentStory: testStory.slice(),
  currentEventOrig: {},
  currentEvent: {},
  currentEventIndex: 0,
  importedMedia: []
};

describe("default", () => {
  test("expect that bad action types return the same state", () => {
    expect(reducer(initialState, { type: "bob", payload: "joe" })).toEqual(
      initialState
    );
  });
});

describe("create new story", () => {
  test("expect to create a new story", () => {
    let action1 = createNewStory();
    expect(reducer(initialState1, action1).currentStoryOrig).toEqual([
      {
        story_title: "",
        tags: [],
        events: []
      }
    ]);
  });

  test("expect to create a new story", () => {
    let action1 = createNewStory();
    expect(reducer(initialState1, action1).currentStory).toEqual([
      {
        story_title: "",
        tags: [],
        events: []
      }
    ]);
  });
});

describe("create new event", () => {
  test("expect to create a new event", () => {
    let action2 = createNewEvent(14);
    expect(
      reducer(initialState1, action2).currentStory[0].events.length
    ).toEqual(14);
  });

  test("expect to create a new event", () => {
    let action2 = createNewEvent(14);
    expect(reducer(initialState1, action2).currentStory[0].events[14]).toEqual({
      event_num: 14,
      event_title: "",
      date: "",
      location: "",
      event_txt: "",
      media: []
    });
  });
});

describe("expect event to update", () => {
  test("expect event to event", () => {
    const testEvent = {
      event_num: 13,
      event_title: "Mary Cook is Married to John Brown",
      date: "8 April 1843",
      location: "Baillieston, Old Monkland, Lanark, Scotland",
      event_txt:
        "Mary and John were married at Baillieston, Old Monkland, Lanark, Scotland. Not much is known of their relationship except they had four children.",
      media: []
    };
    let action3 = updateEvent(testEvent);

    expect(reducer(initialState1, action3).currentEvent).toEqual(testEvent);
  });
});

describe("Update event order", () => {
  test("expect index 9 and 10 to swap", () => {
    const action4 = updateEventOrder(9, 10);
    let result = reducer(initialState1, action4);

    expect(result.currentStory[0].events[9]).toEqual({
      event_id: 11,
      event_num: 9,
      event_title: "Mary Cook moves to Saint George",
      date: "1862",
      location: "Saint George",
      event_txt:
        "Mary cook with her family was called to help settle in Saint George, also known as the Dixie Mission. There she had her seventh child Alexander. There she would stay for five more years.",
      media: [
        {
          media_id: 17,
          media_type: "pic",
          media_ref:
            "https://history.lds.org/bc/content/images/library/exhibits/st-george-tabernacle/st-george-1890-uhs.jpg"
        }
      ]
    });

    expect(result.currentStory[0].events[10]).toEqual({
      event_id: 10,
      event_num: 10,
      event_title: "Mary Cook moves back to Salt Lake",
      date: "1860",
      location: "Salt Lake City",
      event_txt:
        "After two years Mary and her family moved back to Salt Lake City. There she had her sixth child, Agnes.",
      media: []
    });
  });
});

describe("Delete Event", () => {
  test("event_num 5 should be deleted", () => {
    let action6 = deleteEvent(5)
    expect(reducer(initialState2, action6).currentStory[0].events.length)
      .toEqual(14)
  });
});

describe("Clear current state", () => {
  test("should remove current state", () => {
    let action5 = clearState();
    expect(reducer(initialState1, action5)).toEqual(initialState);
  });
});