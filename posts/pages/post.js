import Header from '../components/header'
import withMui from '../shared/MUI/withMUI'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import 'isomorphic-unfetch'
import RaisedButton from 'material-ui/RaisedButton'
import Link from 'next/link'

const Post = ({ title, content }) => 
    <div>
        <Header />
        <Card>
            <CardHeader title={title} />
            <CardText>
                { /*l dangerously es como el innerHtml */}
                <div dangerouslySetInnerHTML={{__html: content }} />
                <RaisedButton fullWidth={true}>
                    <Link href="/" as="/blog">
                        <a> Go back to blog!</a>
                    </Link>
                </RaisedButton>
            </CardText>
        </Card>
    </div>;

Post.getInitialProps = async ({ query: { id }}) => {
    //BLOGGER_URL https://www.googleapis.com/blogger/v3/blogs/4789269094064278868/posts
    const response = await fetch (`${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`)
    const data = await response.json();
    const title = data.title;
    const content = data.content;
    return { title, content }
}

export default withMui(Post);