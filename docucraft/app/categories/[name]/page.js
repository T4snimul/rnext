import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByCategory } from "@/utils/doc-util";
import React from "react";

function CategoriesPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocs = getDocumentsByCategory(docs, name);
  return <ContentDisplay id={matchedDocs[0].id} />;
}

export default CategoriesPage;
