import React from 'react';
import Link from 'next/link';
import {ForceGraph, ForceGraphLink} from 'react-vis-force';
import people from '../data/people.json';
import ForceGraphNode from '../components/force-graph-node.js';

const PersonLink = props => (
  <li>
    <Link href="/person/[name]" as={`/person/${props.name}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);

const addLinks = person => {
  {person.links ? person.links.map(link => {
    console.log
    return (
    <ForceGraphLink link={{ source: person.id, target: link, strokeWidth: 2 }} strokeWidth={1} />
    )
    }) : null}
};

const Index = props => {
  return (
    <div>
      <ForceGraph showLabels simulationOptions={{ height: 600, width: 600 }}>
        {people.nodes.map(person => {
          {addLinks(person)}
          return (          
            <ForceGraphNode key={person.id} node={{ id: person.id, name: person.name, label: person.name, image: person.img }} />
        );
        })}
        {/* {people.links.map(l => {
          console.log(l);
          return (          
            <ForceGraphLink link={{ source: 1, target: l }} strokeWidth={1} />
        );
        })} */}
        <ForceGraphLink link={{ source: 1, target: 2, strokeWidth: 2 }} strokeWidth={1} />
      </ForceGraph>
      <ul>
      {people.nodes.map(person => (
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
  return {
    props: [],
    people: people.nodes,
    renderTree: true,
  };
};

export default Index;