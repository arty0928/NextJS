import React from "react";
import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import Head from "next/head";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  // 데이터를 불러오지 못하면 notFound 화면
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

/*
  fallback 옵션
  - false : 404 Not Found 반환
  - blocking : 즉시 생성 후 반환(like SSR) , 
        주의 : 존재하지 않은 페이지를 SSR 방식으로 요청할 때 사전 렌더링 시간이 길어지면 로딩이 길어질 수 있음
              -> True 옵션으로 해결 
  - true : 1. 일단 데이터 없는 페이지만 미리 반환 
           2. 즉시 생성 후 Props 만 따로 반환, 데이터가 있는 상태의 페이지 렌더링
*/
export const getStaticPaths = () => {
  return {
    //문자열 파라미터의 값은 항상 "문자열"
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    // paths에 없는 파라미터를 보낼 때 대비책
    fallback: true,
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입북스" />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
