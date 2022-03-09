import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router';

import { Routes } from '../../data/constants';
import { PostsView } from '../posts';
import { TopicsView } from '../topics';

export default function DiscussionSidebar({ displaySidebar }) {
  const location = useLocation();

  return (
    <div
      className={classNames('flex-column', {
        'd-none': !displaySidebar,
        'd-flex w-25 w-xs-100 w-lg-25 overflow-auto h-100 pb-2': displaySidebar,
      })}
      style={{ minWidth: '30rem' }}
      data-testid="sidebar"
    >
      <Switch>
        <Route path={Routes.POSTS.MY_POSTS}>
          <PostsView showOwnPosts />
        </Route>
        <Route
          path={[Routes.POSTS.PATH, Routes.POSTS.ALL_POSTS, Routes.TOPICS.CATEGORY]}
          component={PostsView}
        />
        <Route path={Routes.TOPICS.PATH} component={TopicsView} />
        <Redirect
          from={Routes.DISCUSSIONS.PATH}
          to={{
            ...location,
            pathname: Routes.TOPICS.ALL,
          }}
        />
      </Switch>
    </div>
  );
}

DiscussionSidebar.defaultProps = {
  displaySidebar: false,
};

DiscussionSidebar.propTypes = {
  displaySidebar: PropTypes.bool,
};
