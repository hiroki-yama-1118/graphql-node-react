import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const MovieList = () => {
  return (
    <Card>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>ジャンル</th>
              <th>監督</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>タイトル</td>
              <td>ジャンル</td>
              <td>監督</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MovieList;
