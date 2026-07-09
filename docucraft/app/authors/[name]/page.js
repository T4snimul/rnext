import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/docs";
import { getDocumentsByAuthor } from "@/utils/doc-util";
import React from "react";

function AuthorsPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocs = getDocumentsByAuthor(docs, name);
  return <ContentDisplay id={matchedDocs[0].id} />;
}

export default AuthorsPage;
