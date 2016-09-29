import * as React from "react";
import { t } from "i18next";

interface EmptyEditorProps {
}

/** The bottom half of the regimen editor panel (when there's something to
    actually edit). */
export function EmptyEditor({}: EmptyEditorProps) {
    return <div>
        <p> {t("Please click 'Add' to start editing a regimen.")} </p>
    </div>;
}
