const validators = {
  noEmptyString: {
    validator: (v: string) => {
      return Promise.resolve(v !== " ");
    },
    message: `Please, no empty strings.`,
  },
  noSpecialChars: {
    validator: (v: string) => {
      return Promise.resolve(/^(a-z|A-Z|0-9)*[^`#$%^&*+()<>']*$/g.test(v));
    },
    message: `Please, no special characters.`,
  },
  noDuplicates: {
    validator: (v: []) => {
      const isDuplicate = v.some(function (item, id) {
        return v.indexOf(item) !== id;
      });
      return Promise.resolve(!isDuplicate);
    },
    message: `No repeating keywords.`,
  },
};

export default validators;
