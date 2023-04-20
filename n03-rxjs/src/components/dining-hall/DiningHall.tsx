import { useEffect, useState } from "react";
import { pairwise, Subscription } from "rxjs";
import { Menu } from "../../class/Menu";
import { FoodOrderCore, FoodOrderNotice } from "../../rxjs/FoodOrderNotice";
import { OrderRequestStore } from "../../rxjs/OrderStore";
import { Visitor, VisitorX } from "../visitor/Visitor";
import styles from './DiningHall.module.scss';

import type { RootSalesState } from '../../store/sales/store-sales'
import { useSelector, useDispatch } from 'react-redux'
import { addSales, incrementOrderMenu } from '../../store/sales/slice-sales'

// import {decode as base64_decode, encode as base64_encode} from 'base-64';

const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
const _btoa = (str: string) =>
	Array.from(new TextEncoder().encode(str))
		.map(x => x.toString(2).padStart(8, "0"))
		.join("")
		.padEnd(Math.ceil(str.length * 8 / 6) * 6, "0")
		.split(/(.{6})/)
		.filter(x => x)
		.map(x => base64Chars[parseInt(x, 2)])
		.join("")

const _atob = (base64Str: string): Uint8Array => {
      const strArray = base64Str.replace(/=/g, "").split("");
      const result = new Uint8Array(strArray.length * 6 / 8);
      let connection = 0;
      let uintIterator = 0;
      strArray.forEach((m, i) => {
        const tableIndex = base64Chars.indexOf(strArray[i]);
        const mod = i % 4;
        if (mod === 0) {
          connection = tableIndex << 2;
          return;
        }
        const bitsToShift = 6 - mod * 2;
        connection += tableIndex >>> bitsToShift;
        result[uintIterator] = connection;
        uintIterator++;
        connection = (tableIndex << (8 - bitsToShift)) % 256;
      });
      return result;
    };

export const DiningHall = () => {

  // local store
  const [visitorX, setVisitorX] = useState<VisitorX>({});
  let visitorLocal: VisitorX = {};

  // global store
  const sales = useSelector((state: RootSalesState) => state.sales.value)
  const dispatch = useDispatch()

  // store
  let order$: Subscription;
  const _notice: FoodOrderNotice = FoodOrderNotice.instance();
  const _order: OrderRequestStore = OrderRequestStore.instance();

  let numberOfVisitor = 0;

  useEffect(() => {
    console.log(123)
    // console.log(Buffer.from(, 'base64').toString());
    // let decoded = base64_decode('MS4g44GC44GE44GG44GI44GKCjIuIOOBi+OBjeOBj+OBkeOBkwozLiBzYS1zaGktc3Utc2Utc28KNC4g44Gf44Gh44Gk44Gm44GoCg==');
    // const decoded = decodeURIComponent(atob('MS4g44GC44GE44GG44GI44GKCjIuIOOBi+OBjeOBj+OBkeOBkwozLiBzYS1zaGktc3Utc2Utc28KNC4g44Gf44Gh44Gk44Gm44GoCg=='));
    // console.log(decoded);
    
    var encodedData = window.btoa(window.unescape(encodeURIComponent('こんにちは')));
    console.log(encodedData)
    var decodedData = decodeURIComponent(escape(window.atob(encodedData)));
    console.log(decodedData)

    const text = "こんにちは"
    const encoded = window.btoa(encodeURIComponent(text))
    console.log(encoded) //=> JUUzJTgxJTkzJUUzJTgyJTkzJUUzJTgxJUFCJUUzJTgxJUExJUUzJTgxJUFG
    const decoded = decodeURIComponent(window.atob(encoded))
    console.log(decoded) //=> こんにちは
    
    const a = _btoa("あいうえお");
    console.log("OK: ", a);
    const uint8Array = _atob(a);
    const decoder = new TextDecoder();
    const b = decoder.decode(uint8Array);
    console.log("OK: ", b);


    // constructive

    // compleat detecter
    order$ = _order.stream.order.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {
      _order.compleatExtractor(prev, curr).forEach(f => {

        // order arrived
        visitorLocal[f.customerId].status = 'eating';
        setVisitorX({ ...visitorLocal })

        // compleat
        setTimeout(() => {
          delete visitorLocal[f.customerId]
          setVisitorX({ ...visitorLocal })
          numberOfVisitor--;
          // payment
          dispatch(addSales(f.menu.price));
          dispatch(incrementOrderMenu(f.menu.name));
        }, import.meta.env.VITE_EATING_TIME);

      });
    });

    // order request
    const orderRequest = () => {

      // Decide on the number of guests and the menu
      const orderList = (new Array(Math.floor(Math.random() * 4) + 1).fill(0)).map((f, i) => {

        numberOfVisitor++;

        // menu and ID.
        const mKeyList = Object.keys(Menu);
        const mVal = Menu[mKeyList[Math.floor(Math.random() * mKeyList.length)] as keyof typeof Menu];
        const id = Math.random().toString(32).substring(2);
        // console.log( mVal.name, id )

        // add visitor
        visitorLocal = {
          ...visitorLocal,
          ...{
            [id]: {
              menu: mVal,
              status: 'select',
              id: id
            }
          }
        };

        // return order object
        return {
          menu: mVal,
          customerId: id
        } as FoodOrderCore

      });
      setVisitorX({ ...visitorLocal })

      // order
      setTimeout(() => {

        // request order
        _notice.set({
          order: orderList
        });
        orderList.forEach(f => visitorLocal[f.customerId].status = 'wait');
        setVisitorX({ ...visitorLocal })

      }, 1500);

      // next visitor
      if (numberOfVisitor < import.meta.env.VITE_MAX_VISITOR) {
        setTimeout(() => {
          orderRequest();
        }, Math.floor(Math.random() * 1000) + 4000);
      } else {
        setTimeout(() => {
          orderRequest();
        }, 10000);        
      }
    }
    orderRequest();

    return () => {
      // destructive
      console.log("order$.unsubscribe();")
      order$.unsubscribe();
    };
  }, [])

  return (
    <div className={styles.main}>
      <h2>DiningHall:</h2>
      <div className="visitorList">
        {
          Object.keys(visitorX).map(key => {
            return <Visitor key={visitorX[key].id} visitorX={visitorX[key]} />
          })
        }
      </div>
    </div>
  );
};
