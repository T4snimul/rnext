import ContentDisplay from "@/app/components/ContentDisplay";
import React from "react";

function ContentPage({ params: { contentId } }) {
  return <ContentDisplay id={contentId} />;
}

export default ContentPage;
