import * as React from "react";
import { BackArrow } from "./back_arrow";
import { t } from "i18next";

export class AddGroup extends React.Component<any, any> {
  render() {
    return  <div className="panel-container cyan-panel">
              <div className="panel-header cyan-panel">
                <p className="panel-title">
                  <BackArrow/>{t("Add Group")}
                </p>
              </div>
              <div className="panel-content">
                <label>{t("Name")}</label>
                <input placeholder="My new group"
                         type="text"
                         className="flex3"/>
                <label>{t("Plants in this group")}</label>
                <p>{t("Select from map to add")}</p>
                <label>{("Sub-Groups")}</label>
                <p>{t("Select from map to add")}</p>
                <label>{("Parent-Groups")}</label>
                <p>{t("Add parent groups")}</p>
                <button className="button-like cyan">
                  {t("Save")}
                </button>
              </div>
            </div>;
  }
}
