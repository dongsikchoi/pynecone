import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, Heading, Image, Text, VStack} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "ws://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"count": 0, "dir": "C:/Users/SIK/VSCODE/test_pynecone/testapp/assets", "format": "", "image": "", "events": [{"name": "state.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const Event = events => setState({
  ...state,
  events: [...state.events, ...events],
})
useEffect(() => {
  if(!isReady)
    return;
  if (!socket.current) {
    connect(socket, state, result, setResult, router, EVENT)
  }
  const update = async () => {
    if (result.state != null) {
      setState({
        ...result.state,
        events: [...state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(state, result, setResult, router, socket.current)
  }
  update()
})
return (
<VStack>
<Heading size="2xl"
sx={{"color": "green", "fontFamily": "Silkscreen", "fontSize": "3em"}}>
{`dschoi Test!!`}</Heading>
<Text sx={{"fontSize": "1.5em"}}>
{state.image}</Text>
<Text sx={{"fontFamily": "Silkscreen", "fontSize": "1.5em"}}>
{`i'm not a robot`}</Text>
<Button colorScheme="red"
onClick={() => Event([E("state.select_gif", {})])}
sx={{"borderRadius": "1em"}}>
{`select_gif`}</Button>
<Button colorScheme="green"
onClick={() => Event([E("state.select_other", {})])}
sx={{"borderRadius": "1em"}}>
{`select_other`}</Button>
<Image src={state.image}
sx={{"width": "500px", "height": "auto", "borderRadius": "9px 9px", "border": "5px solid #ff2500", "boxShadow": "lg"}}/>
<NextHead>
<title>{`Pynecone App`}</title>
<meta content="A Pynecone app."
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></VStack>
)
}