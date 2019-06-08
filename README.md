# storefront
<h1> Tool for managing buying and selling from a store </h1>
<h2> Notes before starting </h2>
<p> In order to be able to use the store, you must first have MySQL setup on your machine </p>
<p> You must run SOURCE bamazon.sql on your machine in order to setup the initial DB </p>
<p> Initial DB has a product table </p>
<ul>
  <li> item_id </li>
  <li> product_name </li>
  <li> deparment_name </li>
  <li> price </li>
  <li> stock_quantity </li>
</ul>

<h2> Customer </h2>
<h4> Goal </h4>
<p> Allow someone to see the inventory from the store and make a purchase </p>

<h4> Functionality </h4>
<ul>
  <li> see inventory </li>
  <li> checks whether there is enough inventory </li>
  <ul>
    <li> if enough inventory exists it should place the order and update the inventory </li>
    <li> if there is not enough inventory it should reject the order </li>
  </ul>
</ul>

<h2> Store Manager </h2>
<h4> Goal </h4>
<p> Allow someone to manage the store catalogue and inventory </p>

<h4> Functionality </h4>
<ul>
  <li> view products </li>
  <li> view low inventory items </li>
  <li> add to inventory </li>
  <li> Add new product </li>
</ul>
