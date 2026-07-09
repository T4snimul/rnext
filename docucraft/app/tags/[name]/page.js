import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByTag } from "@/utils/doc-util";
import React from "react";

function TagsPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocs = getDocumentsByTag(docs, name);
  return <ContentDisplay id={matchedDocs[0].id} />;
}

export default TagsPage;
