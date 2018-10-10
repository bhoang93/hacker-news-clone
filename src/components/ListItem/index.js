import React from "react";
import getSiteHostName from "utils/GetSiteHostName";
import getArticleLink, { HN_USER, HN_ITEM } from "utils/GetArticleLink";

import { Item, Title, Host, ExternalLink, Description, CommentLink } from "./style";

const LINK_REL = "noopener noreferrer nofollow"

const ListItem = ({ by, kids = [], score, url, title, id, type, time }) => {
  const site = getSiteHostName(url) || "new.ycombinator.com";
  const link = getArticleLink({ url, id });
  const commentUrl = `${HN_ITEM}${id}`;
  const userUrl = `${HN_USER}${by}`;
  return (
    <Item>
      <ExternalLink href={link} rel={LINK_REL} target="_blank">
        <Title>
          {title}
        </Title><Host>({site})</Host>
      </ExternalLink>
      <Description>
          {score} points by {" "}
          <CommentLink href={userUrl} rel={LINK_REL} target="_blank">
            <span style={{color: "white"}}>{by}</span>
          </CommentLink>
          {" | "}
          <CommentLink href={commentUrl} rel={LINK_REL} target="_blank">
            {kids.length} Comments
          </CommentLink>
      </Description>
    </Item>
  );
};

export default ListItem;
