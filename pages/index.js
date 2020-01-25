import React from 'react';
import Link from 'next/link';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import fetch from 'isomorphic-unfetch';

const PersonLink = props => (
  <li>
    <Link href="/person/[name]" as={`/person/${props.name}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

const Index = props => {
console.log(props);
  return (
    <div>
      <ForceGraph simulationOptions={{ height: 300, width: 300 }}>
        {props.shows.map(person => (
          <ForceGraphNode node={{ id: person.id, name: person.name }} fill="red" />
        ))}
      </ForceGraph>
      <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
      <ul>
        <PersonLink name="Lev Parnas" />
        <PersonLink name="Donald Trump" />
        <PersonLink name="Jared Kushner" />
      </ul>
      <ul>
      {props.shows.map(person => (
        <li key={person.id}>
          <Link href="/person/[name]" as={`/person/${person.name}`}>
            <a>{person.name}</a>
          </Link>
        </li>
      ))}
    </ul>
</div>
)};
  
Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  console.log(data.map(entry => entry.show));

  return {
    props: [],
    shows: data.map(entry => entry.show),
    renderTree: true,
  };
};

export default Index;