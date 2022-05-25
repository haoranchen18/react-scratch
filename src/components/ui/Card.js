import classes from './Card.module.css';

// 此处的props，代表的不是Card的property，而是Card要wrap的所有content.
// 取得所有content 的方式就是props.children 参数名字可以改。children 是固定的
function Card(props) {
    return <div className={classes.card}>{props.children}</div>;
  }
  
export default Card;