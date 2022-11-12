export default function ListingGrid(props) {
  const children = [];
  for (let i = 0; i < props.children.length; i++) {
    let j = parseInt(i / 3);
    if (i % 3 === 0) {
      children.push([]);
    }

    children[j].push(props.children[i]);
  }

  console.log(children);
  return (
    <div className="container">
      {children.map((x, i) => (
        <div className="row">
          {children[i].map((y) => (
            <div className="col">{y}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
