import EntryStatus from "./components/Schemas/EntryStatus";
import dicionary from "lorem-ipsum/lib/dictionary";
import loremIpsum from "lorem-ipsum";

export default class Generator {
  constructor(category, callback) {
    this.category = category;
    this.callback = callback || (() => null);
    this.rate = 1;
    this.active = true;

    this.generators = category.entries.map(entry => {
      const holder = {};
      const interval = () =>
        (Math.round(Math.random() * 5000) + 1000 * 60) / this.rate;
      const gen = () => {
        if (this.active) this.callback(this.generate(entry));
        holder.interval = setTimeout(gen, interval());
      };
      // gen();
      return holder;
    });

    this.Active = this.Active.bind(this);
  }
  Active(isActive) {
    this.active = isActive;
    if (!isActive) this.Clear();
    else
      this.generators = this.category.entries.map(entry => {
        const holder = {};
        const interval = () =>
          (Math.round(Math.random() * 5000) + 1000 * 60) / this.rate;
        const gen = () => {
          if (this.active) this.callback(this.generate(entry));
          holder.interval = setTimeout(gen, interval());
        };
        holder.interval = setTimeout(gen, interval());
        return holder;
      });
  }
  generate(categoryEntry) {
    const entry = {
      fields: {},
      mType: null,
      privacy: ["public", "private"][Math.floor(Math.random() * 2)],
      category: this.category.name,
      color: this.category.color,
      status: EntryStatus.Completed
    };
    categoryEntry.fields.forEach(field => {
      entry.fields[field.name] = this.generateField(field.type);
    });
    entry.mType = categoryEntry.id;
    return entry;
  }

  generateOne() {
    const index = parseInt(Math.random() * this.category.entries.length, 10);
    const it = this.category.entries[index];
    return this.generate(it);
  }
  setRate(rate) {
    if (rate < 0) return;
    if (rate > 50) return;
    this.rate = rate;
  }
  Clear() {
    this.generators.forEach(gen => clearTimeout(gen.interval));
  }
  /* eslint-disable-next-line */
  generateField(type) {
    switch (type) {
      case "text":
        return loremIpsum({
          count: 1, // Number of words, sentences, or paragraphs to generate.
          units: "sentences", // Generate words, sentences, or paragraphs.
          sentenceLowerBound: 5, // Minimum words per sentence.
          sentenceUpperBound: 10, // Maximum words per sentence.
          paragraphLowerBound: 1, // Minimum sentences per paragraph.
          paragraphUpperBound: 1, // Maximum sentences per paragraph.
          format: "plain", // Plain text or html
          words: [
            "target",
            "command",
            "decision",
            "deploy",
            ...dicionary.words.slice(0, 30)
          ], // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
          random: Math.random // A PRNG function. Uses Math.random by default
        });
      case "octas":
        return ["1/8", "2/8", "3/8", "4/8", "5/8", "6/8", "7/8", "8/8"][
          Math.random() * 7
        ];
      case "angle":
        return Math.round(Math.ceil(Math.random() * 360 * 10)) / 10;
      case "speed":
        return Math.round(Math.random() * 100 * 10) / 10;
      case "distance":
        return Math.round(Math.random() * 100 * 10) / 10;
      case "wind-state":
        return Math.ceil(Math.random() * 12);
      case "integer":
        return Math.ceil(Math.random() * 30);
      case "day-night":
        return ["Day", "Night"][Math.random() * 2];
      case "frequency":
        return Math.round(Math.random() * 500 * 10) / 10;
      default:
        return "No value generator";
    }
  }
}
