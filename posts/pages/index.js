import Header from '../components/header';
import withMui from '../shared/MUI/withMUI';
import fetch from 'isomorphic-unfetch';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'next/link';

const Index = ({ posts }) => 
    <div>
    <style jsx>
        {`
            .span {
                font-weight: 600;
                font-size: 18px;
                color: #fff;
                float: right;
                margin-right: 12px;
            }
        `}
    </style>
    <Header />
      {
          posts.map((x, idx) => 
            <Card key={x.id}> 
                <CardHeader title={x.title} />
                <CardText>
                    <RaisedButton fullWidth={true} primary={true} >
                        <Link href={`/post?id=${x.id}`} as={`/blog/${x.id}`}>
                            <a style={{
                                textDecoration: 'none',
                                fontSize: '18px',
                                color: '#fff',
                                float: 'left',
                                marginLeft: 12
                            }}>Click to view post!</a>
                        </Link>
                        <span className="span">{idx}</span>
                    </RaisedButton>
                </CardText>
            </Card>
        )
      }
    </div>;

Index.getInitialProps = async () => {
    const response = await fetch(`${process.env.BLOGGER_URL}?key=${process.env.API_KEY}`);
    const data = await response.json();
    console.log(`Show data fetched. Count: ${data.length}`)
    return { posts: data.items }
}

export default withMui(Index);