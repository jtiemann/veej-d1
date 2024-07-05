
import app from "./index.ts";

const cond = (arms = []) => (value) => arms.find((a) => a[0](value) === true)[1](value);

const endpoints = (p) => {
  // return "ed";
  const router = {}
  router['interceptor'] = (p = {}) => {
    const { msg } = p
    return cond([
      [({ msg }) => msg.action == 'simple',  (j) => router['simple'](j)],
      [({ msg }) => msg.action == 'users',  (j) => router['users'](j)],
      [({ msg }) => msg.action == 'products',  (j) => router['products'](j)],
      [({ msg }) => msg.action == 'productById',  (j) => router['productById'](j)],
      [_ => true, x => console.error('unknown', x)]
    ]) ({ msg })
  }

  router['simple'] = (k = {}) => {
    const { msg } = k;
    console.log(msg.c.env)
    return 'cool';
  }

  router['users'] = async (k = {}) => {
    const { msg } = k;
    // sql(c)

     try {
      // Query the products table
      const users = await msg.c.env.DB.prepare("SELECT * FROM users")
      .all();
      const template = await msg.c.env.DB.prepare("select template from templates where name = 'homepage'")
      .all();
      const homepage = template.results[0].template;
      const partners = users.results.reduce((sum, unit) => {
        return sum + `<div id="my-name">${unit.name}</div><div id="my-title">${unit.role}</div>`
      }, '');
      const  hydrated_partners = String(homepage).replace('{{partners}}', partners)
      return hydrated_partners;

    } catch (error) {
      console.error('Database query error:', error);
      return JSON.stringify({ error: 'Failed to fetch users or templates' });
    }
  };

  router['products'] = async (k = {}) => {
    const { msg } = k;
      try { // Query the products table
      console.log(msg.c.env)
        const { results } = await msg.c.env.DB.prepare("SELECT * FROM products")
        .all();
        return  JSON.stringify(results);
      } catch (error) {
        console.error('Database query error:', error);
        return JSON.stringify({ error: 'Failed to fetch products' });
      }
  };

  router['productById'] = async (k = {}) => {
    const { msg } = k;
    // sql(c)
      console.log(msg.payload.id)
     try {
      // Query the products table by e.g. id /product?id=2
      const { results } = await msg.c.env.DB.prepare("SELECT * FROM products where id = ?")
                          .bind(msg.payload.id)
                          .all();
      return  JSON.stringify(results);
    } catch (error) {
      console.error('Database query error:', error);
      return JSON.stringify({ error: 'Failed to fetch products' });
    }
  };

  return router['interceptor'](p)
}

export { endpoints };