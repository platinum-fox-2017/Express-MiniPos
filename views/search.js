</html>
  <head>
    <title>SEARCH</title>
  </head>
  <h2>SEARCH</h2>
  <form method="POST">
    <table>
      <tbody>
        <tr>
          <td>Item Name</td>
        </tr>
        <tr>
          <td><input type="text" name="Name"></td>
        </tr>
        <tr>
          <td> Min Price</td>
          <td> Max Price</td>
        </tr>
          <tr>
            <td><input type="text" name="MinPrice"></td>
            <td><input type="text" name="MaxPrice"></td>
          </tr>
          <tr>
            <td><button>Search</button></td>
          </tr>
      </tbody>
    </table>
  </form>
  <h1>Search Result</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item Name</th>
          <th>Supplier Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <% if (data) { %>
          <% for (let i = 0; i < data.length; i++){ %>
            <tr>
              <td><%= i+1 %></td>
              <td><%= data[i].Item.Name %></td>
              <td><%= data[i].Supplier.Name %> </td>
              <td><%= data[i].Price %></td>
            </tr>
          <% } %>
        <% } %>
      </tbody>
    </table>
  </body>
</html>
