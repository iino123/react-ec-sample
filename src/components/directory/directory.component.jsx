import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component";
import "./directory.style.scss";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      // NOTE: 渡す時にkey,valueが同じものは、スプレッド演算子で受け取りそのまま渡す
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
