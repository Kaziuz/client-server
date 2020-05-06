import AppBar from 'material-ui/AppBar';

const Header = ({ title = 'Next.js blogging application'}) => <AppBar showMenuIconButton={false} title={title} />

export default Header;