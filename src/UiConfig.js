export default {
  name: "General",
  categories: [
    {
      name: "General",
      color: "green",
      priority: "High",
      widgets: [
        {
          id: "compass"
        }
      ],
      entries: [
        {
          id: "co-comment",
          name: "CO Comment",
          priority: "High",
          step: {
            title: "Generate Entry",
            order: 5,
            text:
              "Ok, let’s create a narrative entry, direct from the CO.  So, click on the CO Comment button.",
            position: "left"
          },
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "manoeuvre",
          name: "Manoeuvre",
          priority: "Medium",
          fields: [
            {
              name: "Course",
              type: "angle"
            },
            {
              name: "Speed",
              type: "speed"
            },
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "oow-comment",
          name: "OOW Comment",
          priority: "Medium",
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "weather",
          name: "Weather",
          priority: "High",
          fields: [
            {
              name: "Wind speed",
              type: "speed"
            },
            {
              name: "Wind direction",
              type: "angle"
            },
            {
              name: "Cloud cover",
              type: "octas"
            },
            {
              name: "Wind state",
              type: "wind-state"
            },
            {
              name: "Wave height",
              type: "integer"
            },
            {
              name: "Synopsis",
              type: "text"
            }
          ]
        },
        {
          id: "day-night",
          name: "Day night",
          priority: "High",
          fields: [
            {
              name: "State",
              type: "day-night"
            }
          ]
        }
      ]
    },
    {
      name: "Air",
      color: "blue",
      priority: "High",
      entries: [
        {
          id: "new-contact",
          name: "New Contact",
          priority: "High",
          fields: [
            {
              name: "Bearing",
              type: "angle"
            },
            {
              name: "Range",
              type: "distance"
            },
            {
              name: "Type",
              type: "text"
            },
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "helo-take-off",
          name: "Helo take off",
          priority: "High",
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "helo-landing",
          name: "Helo landing",
          priority: "High",
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        }
      ]
    },
    {
      name: "Surface",
      color: "cyan",
      priority: "High",
      entries: [
        {
          id: "new-contact",
          name: "New contact",
          priority: "High",
          fields: [
            {
              name: "Range",
              type: "distance"
            },
            {
              name: "Bearing",
              type: "angle"
            },
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "investigate-contact",
          name: "Investigate",
          priority: "High",
          fields: [
            {
              name: "Type",
              type: "text"
            },
            {
              name: "Suspected",
              type: "text"
            }
          ]
        }
      ]
    },
    {
      name: "Underwater",
      color: "purple",
      priority: "High",
      widgets: [
        {
          step: {
            title: "Interactive controls",
            order: 8,
            text:
              "Instead of plain buttons, some concepts can be represented by dedicated widgets.  These indicators are used both to indicate the current state of each mast and to record mast activity. Click on some mast icons, and observe new entries being inserted",
            position: "right"
          },
          id: "masts",
          masts: ["Search", "Radar", "ESM"]
        }
      ],
      entries: [
        {
          id: "new-contact-uww",
          name: "New contact",
          priority: "High",
          fields: [
            {
              name: "Range",
              type: "distance"
            },
            {
              name: "Bearing",
              type: "angle"
            },
            {
              name: "Suspected",
              type: "text"
            }
          ]
        },
        {
          id: "mast-up",
          name: "Mast up",
          priority: "High",
          hidden: "true",
          fields: [
            {
              name: "Reason",
              type: "text"
            },
            {
              name: "Type",
              type: "text"
            }
          ]
        },
        {
          id: "mast-down",
          name: "Mast down",
          priority: "High",
          hidden: "true",
          fields: [
            {
              name: "Reason",
              type: "text"
            },
            {
              name: "Type",
              type: "text"
            }
          ]
        },
        {
          id: "deploy-array",
          name: "Deploy array",
          priority: "High",
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "recover-array",
          name: "Recover array",
          priority: "High",
          fields: [
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "active-ping",
          name: "Active ping",
          priority: "High",
          fields: [
            {
              name: "Frequency",
              type: "text"
            }
          ]
        }
      ]
    },
    {
      name: "Engineering",
      color: "red",
      priority: "High",
      entries: [
        {
          id: "eng-failure",
          name: "Failure",
          priority: "High",
          fields: [
            {
              name: "System",
              type: "text"
            },
            {
              name: "Comment",
              type: "text"
            }
          ]
        },
        {
          id: "change-lineup",
          name: "Change in line-up",
          priority: "High",
          fields: [
            {
              name: "System",
              type: "text"
            },
            {
              name: "Change",
              type: "text"
            }
          ]
        }
      ]
    }
  ]
};
