import classes from './Title.module.css';

const Card = (props) => {
    return <h1 className={classes.title}>{props.title}</h1>;
};

export default Card;
