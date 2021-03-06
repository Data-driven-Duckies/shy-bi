import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const titleStyle = {
  fontSize: '400%',
  fontFamily: 'Source Sasns Pro',
  textTransform: 'uppercase',
};
const nameTitleStyle = {
  fontSize: '200%',
  fontFamily: 'Source Sans Pro',
  marginLeft: '50px',
};
const textStyle = {
  group: {
    fontSize: '20px',
    fontFamily: 'Source Sans Pro',
    marginLeft: '50px',
  },
  fontSize: '20px',
  fontFamily: 'Source Sans Pro',
  lineHeight: '25px',
  marginLeft: '50px',
};

const AboutUs = () => (
  <div>
    <Card>
      <CardTitle
        title="BIND"
        titleStyle={titleStyle}
      />
      <CardText
        style={textStyle.group}
      >
        <p>The world is evolving to embrace more gays and lesbians.</p>
        <br />
        <p>We did not want bi people to feel left out.</p>
        <br />
        <br />
        <br />
        <p>Started out initially as 'ShyBi,' 'Bind' is a premium dating app for the sophisticated bicurious people.</p>
        <br />
        <br />
        <br />
        <p>No more shot-in-the-dark style dating.</p>
        <br />
        <p>'Bind' provides a safe platform for anyone to explore his or her sexual orientation.</p>
      </CardText>
    </Card>
    <Card>
      <a href="https://github.com/jw-garrison">
        <CardTitle
          title="JW Garrison"
          titleStyle={nameTitleStyle}
        />
      </a>
      <CardText
        style={textStyle}
      >
        <p> Wife, daughter, and mom, in that order </p>
      </CardText>
    </Card>
    <Card>
      <a href="https://github.com/sojungko">
        <CardTitle
          title="Sojung Park"
          titleStyle={nameTitleStyle}
        />
      </a>
      <CardText
        style={textStyle}
      >  
        <p>Worked as a journalist for five years in Korea before deciding to switch to programming.</p>
        <p>Regrets not having done that sooner.</p>
      </CardText>
    </Card>
    <Card>
      <a href="https://github.com/peterschussheim">
        <CardTitle
          title="Peter Schussheim"
          titleStyle={nameTitleStyle}
        />
      </a>
      <CardText
        style={textStyle}
      >
        <p>A gracefully aging white 30-something man</p>
      </CardText>
    </Card>
  </div>
  );

export default AboutUs;
