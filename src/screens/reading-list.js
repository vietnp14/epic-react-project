import * as React from 'react'
import {Link} from 'components/lib'
import ListItemList from 'components/List-item-list'

const NoListItems = () => (
  <p>
    Hey there! Welcome to your bookshelf reading list. Get started by
    heading over to <Link to="/discover">the Discover page</Link> to add
    books to your list.
  </p>
);

const NoFilteredListItems = () => (
  <p>
    Looks like you've finished all your books! Check them out in your{' '}
    <Link to="/finished">finished books</Link> or{' '}
    <Link to="/discover">discover more</Link>.
  </p>
);

function ReadingListScreen() {
  return (
    <ListItemList
      filterListItems={li => !li.finishDate}
      noListItems={<NoListItems />}
      noFilteredListItems={<NoFilteredListItems />}
    />
  )
}

export default ReadingListScreen;
