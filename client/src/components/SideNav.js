import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  DIRECTOR_LIST,
  ADD_MOVIE,
  MOVIE_LIST,
  ADD_DIRECTOR,
} from "../queries/queries";

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);
  const { register, handleSubmit } = useForm();
  const { register: registerDirector, handleSubmit: handleSubmitDirector } =
    useForm();
  //refetch機能の追加
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  });
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  });

  const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
    console.log(data);
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } });
    e.target.reset();
  };

  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    const IntAge = parseInt(directorAge);
    addDirector({ variables: { name: directorName, age: IntAge } });
    e.target.reset();
  };

  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="directorName"
                placeholder="監督名"
                {...registerDirector("directorName")}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="number"
                name="directorAge"
                placeholder="年齢"
                {...registerDirector("directorAge")}
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieName"
                placeholder="タイトル"
                {...register("movieName")}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieGenre"
                placeholder="ジャンル"
                {...register("movieGenre")}
              />
            </FormGroup>
            <FormGroup>
              <select
                className="form-control"
                type="select"
                name="directorName"
                {...register("directorId")}
              >
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
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
