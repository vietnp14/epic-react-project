import * as React from 'react'
import {Link} from 'components/lib'
import {ListItemList} from 'components/list-item-list'

const NoListItems = () => (
  <p>
    Hey there! This is where books will go when you've finished reading
    them. Get started by heading over to{' '}
    <Link to="/discover">the Discover page</Link> to add books to your
    list.
  </p>
);

const NoFilteredListItems = () => (
  <p>
    Looks like you've got some reading to do! Check them out in your{' '}
    <Link to="/list">reading list</Link> or{' '}
    <Link to="/discover">discover more</Link>.
  </p>
);

function FinishedScreen() {
  return (
    <ListItemList
      filterListItems={li => Boolean(li.finishDate)}
      noListItems={<NoListItems />}
      noFilteredListItems={<NoFilteredListItems />}
    />
  )
}

export {FinishedScreen}
