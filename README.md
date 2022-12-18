db.books.insertMany([
  {
    title: "Title1",
    description: "description1",
    authors: "authors1"
  },
  {
    title: "Title3",
    description: "description3",
    authors: "authors3"
  },
  {
    title: "Title3",
    description: "description3",
    authors: "authors3"
  }
]);

db.books.find( { authors: "authors3" } );

db.inventory.updateOne(
   {_id: ObjectId('639e9be597833c9813754821')},
   {
     $description: "description4",
     $authors: "authors2"
   }
)
