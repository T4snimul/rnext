import ContentDisplay from "@/app/components/ContentDisplay";
import React from "react";

function SubContentPage({ params: { subContentId } }) {
  return <ContentDisplay id={subContentId} />;
}

export default SubContentPage;
