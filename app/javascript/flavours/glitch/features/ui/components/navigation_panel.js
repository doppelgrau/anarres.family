import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from 'react-router-dom';
import Icon from 'flavours/glitch/components/icon';
import TrendsContainer from 'flavours/glitch/features/getting_started/containers/trends_container';
import { showTrends, timelinePreview } from 'flavours/glitch/initial_state';
import FollowRequestsNavLink from './follow_requests_nav_link';
import ListPanel from './list_panel';
import NotificationsCounterIcon from './notifications_counter_icon';
import SignInBanner from './sign_in_banner';
import { preferencesLink, relationshipsLink } from 'flavours/glitch/utils/backend_links';

export default class NavigationPanel extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  };

  static propTypes = {
    onOpenSettings: PropTypes.func,
  };

  render() {
    const { signedIn } = this.context.identity;
    const { onOpenSettings } = this.props;

    return (
      <div className='navigation-panel'>
        {signedIn && (
          <React.Fragment>
            <NavLink className='column-link column-link--transparent' to='/home' data-preview-title-id='column.home' data-preview-icon='home' ><Icon className='column-link__icon' id='home' fixedWidth /><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></NavLink>
            <NavLink className='column-link column-link--transparent' to='/notifications' data-preview-title-id='column.notifications' data-preview-icon='bell' ><NotificationsCounterIcon className='column-link__icon' /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Notifications' /></NavLink>
            <FollowRequestsNavLink />
          </React.Fragment>
        )}

        <NavLink className='column-link column-link--transparent' to='/explore' data-preview-title-id='explore.title' data-preview-icon='hashtag'><Icon className='column-link__icon' id='hashtag' fixedWidth /><FormattedMessage id='explore.title' defaultMessage='Explore' /></NavLink>
        {signedIn || timelinePreview && (
          <>
            <NavLink className='column-link column-link--transparent' to='/public/local' data-preview-title-id='column.community' data-preview-icon='users' ><Icon className='column-link__icon' id='users' fixedWidth /><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='Local' /></NavLink>
            <NavLink className='column-link column-link--transparent' exact to='/public' data-preview-title-id='column.public' data-preview-icon='globe' ><Icon className='column-link__icon' id='globe' fixedWidth /><FormattedMessage id='tabs_bar.federated_timeline' defaultMessage='Federated' /></NavLink>
          </>
        )}

        {!signedIn && (
          <div className='navigation-panel__sign-in-banner'>
            <hr />
            <SignInBanner />
          </div>
        )}

        {signedIn && (
          <React.Fragment>
            <NavLink className='column-link column-link--transparent' to='/conversations'><Icon className='column-link__icon' id='envelope' fixedWidth /><FormattedMessage id='navigation_bar.direct' defaultMessage='Direct messages' /></NavLink>
            <NavLink className='column-link column-link--transparent' to='/bookmarks'><Icon className='column-link__icon' id='bookmark' fixedWidth /><FormattedMessage id='navigation_bar.bookmarks' defaultMessage='Bookmarks' /></NavLink>
            <NavLink className='column-link column-link--transparent' to='/lists'><Icon className='column-link__icon' id='list-ul' fixedWidth /><FormattedMessage id='navigation_bar.lists' defaultMessage='Lists' /></NavLink>

            <ListPanel />

            <hr />

            {!!preferencesLink && <a className='column-link column-link--transparent' href={preferencesLink} target='_blank'><Icon className='column-link__icon' id='cog' fixedWidth /><FormattedMessage id='navigation_bar.preferences' defaultMessage='Preferences' /></a>}
            <a className='column-link column-link--transparent' href='#' onClick={onOpenSettings}><Icon className='column-link__icon' id='cogs' fixedWidth /><FormattedMessage id='navigation_bar.app_settings' defaultMessage='App settings' /></a>
            {!!relationshipsLink && <a className='column-link column-link--transparent' href={relationshipsLink} target='_blank'><Icon className='column-link__icon' id='users' fixedWidth /><FormattedMessage id='navigation_bar.follows_and_followers' defaultMessage='Follows and followers' /></a>}
          </React.Fragment>
        )}

        <div className='navigation-panel__legal'>
          <hr />
          <NavLink className='column-link column-link--transparent' to='/about'><Icon className='column-link__icon' id='ellipsis-h' fixedWidth /><FormattedMessage id='navigation_bar.about' defaultMessage='About' /></NavLink>
        </div>

        {showTrends && (
          <React.Fragment>
            <div className='flex-spacer' />
            <TrendsContainer />
          </React.Fragment>
        )}

      </div>
    );
  }

}
