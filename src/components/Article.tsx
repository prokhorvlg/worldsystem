import classes from './Article.module.css'

const Article = ({ children }: { children: React.ReactNode }) => {
  return <article className={classes.article}>{children}</article>
}

export default Article
