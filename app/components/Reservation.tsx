"use client";

import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxEnvelopeOpen } from "react-icons/rx";
import { db, sendReservation } from "../firebase";
import { RevealWrapper } from "next-reveal";

function Reservation() {
  const [inputValue, setInputValue] = useState<{
    name: string;
    wish: string;
    presence: string;
  }>({
    name: "",
    wish: "",
    presence: "Hadir",
  });
  const [reservations, setReservations] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "reservation"), orderBy("time", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      setReservations(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  }, []);
  return (
    <section id="reservation">
      <div className="bg-[url('/images/anNur/bg.png')] bg-center bg-no-repeat bg-cover px-8 py-16 lg:px-10 space-y-8 -mt-4">
        <RevealWrapper duration={2500} origin="bottom" className="space-y-8">
          <h1 className="text-xl italic font-light text-center">
            Reservation & Wishes
          </h1>
          <p className="text-center text-[0.75rem] text-[#424242]">
            Mohon doa & restu
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nama"
              className="text-[0.8rem] py-2 px-3 placeholder:text-[#5a5a5a50] border-b border-[#A99D87] rounded"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
            <textarea
              placeholder="Berikan Ucapan dan Doa"
              className="h-24 text-[0.8rem] py-2 px-3 placeholder:text-[#5a5a5a50] border-b border-[#A99D87] rounded"
              value={inputValue.wish}
              onChange={(e) =>
                setInputValue({ ...inputValue, wish: e.target.value })
              }
            />
            <div className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="presence"
                id="hadir"
                value="Hadir"
                checked={inputValue.presence === "Hadir" ? true : false}
                onChange={(e) =>
                  })
                }
              />
              <label htmlFor="hadir">Hadir</label>
              <input
                type="radio"
                name="presence"
                id="tidak-hadir"
                value="Tidak Hadir"
                checked={inputValue.presence === "Tidak Hadir" ? true : false}
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    presence: e.target.value,
                  })
                }
              />
              <label htmlFor="tidak-hadir">Tidak Hadir</label>
            </div>
            {inputValue.presence === "Hadir" && (
            )}
            <button
              onClick={() => {
                if (inputValue.name === "")
                  return alert("Mohon masukkan nama anda.");

                sendReservation(
                  inputValue.name,
                  inputValue.wish,
                  inputValue.presence,
                );
                setInputValue({
                  ...inputValue,
                  name: "",
                  wish: "",
                });
              }}
              className="text-[0.75rem] bg-[#424242] flex items-center w-fit rounded text-white gap-2 py-2 px-4 font-bold hover:scale-90 ease-linear duration-[0.2s]"
            >
              <RxEnvelopeOpen />
              <span>Kirim</span>
            </button>
          </div>
        </RevealWrapper>
        <div className="space-y-4">
          {reservations.map((data) => {
            const date = new Date(data.time?.seconds * 1000);
            return (
              <div
                key={data.id}
                className="bg-white p-4 border-b border-[#a99d87] rounded font-light text-[#424242] flex flex-col gap-2"
              >
                <p className="flex items-center gap-2">
                  <span className="font-extrabold text-sm">{data.name}</span>
                  <span
                    className={`text-[0.7rem] ${
                      data.presence === "Hadir"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ({data.presence})
                  </span>
                </p>
                <p className="text-[0.75rem]">{data.wish}</p>
                <p className="flex items-center gap-1 text-[0.75rem]">
                  <AiOutlineClockCircle />
                  <span className="flex gap-2">
                    <span>
                      {getZero(date.getDate())}/{getZero(date.getMonth())}/
                      {getZero(date.getFullYear())}
                    </span>
                    <span>
                      {getZero(date.getHours())}:{getZero(date.getMinutes())}:
                      {getZero(date.getSeconds())}
                    </span>
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Reservation;
