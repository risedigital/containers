import * as test from "tape";
import { Result, Ok, Err } from "./result";

test("Result.ok", t => {
  const err: Result<number, string> = new Err("Fail");
  const ok: Result<number, string> = new Ok(4);

  t.equal(err.ok, false, "Err.ok should equal false");
  t.equal(ok.ok, true, "Ok.ok should equal true");
  t.end();
});

test("Result.map()", t => {
  const err: Result<number, string> = new Err("Fail");
  const ok: Result<number, string> = new Ok(4);

  const add4 = (value: number) => value + 4;
  const toString = (value: number) => String(value);

  const errNewValue = err.map(add4);
  const okNewValue = ok.map(add4);

  t.ok(errNewValue instanceof Err, "Err.map() should return Err");
  t.ok(err instanceof Err, "Err.map() should not mutate");

  t.ok(okNewValue instanceof Ok, "Ok.map() should return Ok");
  const someNewValueString = ok.map(toString);
  t.equal(okNewValue.unwrap(), 8, "Ok.map() should apply function");
  t.equal(
    someNewValueString.unwrap(),
    "4",
    "Ok.map() should be able to map to a different type"
  );
  t.equal(ok.unwrap(), 4, "Ok.map() should not mutate");

  t.end();
});

test("Result.unwrap()", t => {
  const err: Result<number, string> = new Err("Fail");
  const ok: Result<number, string> = new Ok(4);

  t.throws(() => err.unwrap(), "Err.unwrap() should throw");
  t.equal(ok.unwrap(), 4, "Ok(4).unwrap() should equal 4");
  t.end();
});

test("Result.unwrapOr()", t => {
  const err: Result<number, string> = new Err("Fail");
  const ok: Result<number, string> = new Ok(4);

  t.equal(err.unwrapOr(8), 8, "Err.unwrapOr() should return default");
  t.equal(ok.unwrapOr(8), 4, "Ok.unwrapOr() should return value");
  t.end();
});
