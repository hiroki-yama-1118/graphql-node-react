import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { useQuery } from "@apollo/client";
import { DIRECTOR_LIST } from "../queries/queries";

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);
  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="directorName"
                placeholder="監督名"
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="number"
                name="directorAge"
                placeholder="年齢"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieName"
                placeholder="タイトル"
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieGenre"
                placeholder="ジャンル"
              />
            </FormGroup>
            <FormGroup>
              <select className="form-control" type="select" name="directorId">
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id}>{name}</option>
                  ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SideNav;
