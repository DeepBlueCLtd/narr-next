import PropTypes from "prop-types";

export const CategoryPriorityType = PropTypes.oneOf(["High", "Medium", "Low"]);

export const FieldType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

export const EntryType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(FieldType)
});

export const CategoryType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  priority: CategoryPriorityType,
  entries: PropTypes.arrayOf(EntryType).isRequired,
  created: PropTypes.object.isRequired,
  mType: PropTypes.string.isRequired,
  privacy: PropTypes.string.isRequired
});
