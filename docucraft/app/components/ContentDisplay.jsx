import { getDocumentContent } from "@/lib/docs";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

async function ContentDisplay({ id }) {
  const documentContent = await getDocumentContent(id);

  return (
    <article className="prose dark:prose-invert">
      <h1>{documentContent.title}</h1>
      <div>
        <span>Published On: {documentContent.date}</span> by{" "}
        <Link href={`/authors/${documentContent.author}`}>
          {documentContent.author}
        </Link>{" "}
        under the{" "}
        <Link href={`/categories/${documentContent.category}`}>
          {documentContent.category}
        </Link>{" "}
        category.
      </div>
      <div>
        {documentContent.tags &&
          documentContent.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: documentContent.contentHtml }}
      />
    </article>
  );
}

export default ContentDisplay;
