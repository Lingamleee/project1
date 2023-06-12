import React from 'react'
import { Media, MediaContextProvider, mediaStyles } from '../../gloabalsMediaProvider'
import PcMenu from './PcMenu'


class Topbar extends React.Component{
    render(){
    return (
        <div>
            <style>{mediaStyles}</style>
            <MediaContextProvider>
                <Media greaterThan='mobile'>
                    <PcMenu />
                </Media>
                <Media at='mobile'>
                    <PcMenu />
                </Media>
            </MediaContextProvider>
        </div>
    )
    }
}

export default Topbar