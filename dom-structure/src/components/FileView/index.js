import React from "react"
import {
    Heading,
    Button,
    Paragraph,
    Asset
} from "@contentful/forma-36-react-components"
import { Container, IconContainer} from "./styled";
import SvgTrash from '../svg/SvgTrash'

import "./fileview.css"

export default function FileView(props) {
    const title = props.title;
    const description = props.description;
    const file = props.file
    const type = file.contentType.split("/")[0]
    const prettySize = `${(file.details.size / 1000000).toFixed(2)} MB`
    const bg = {
        backgroundImage: `url(${file.url})`
    }

    console.log('PROPS FILEVIEW', props);

    return (
        <Container
            className={`file-view viewport ${
                type === "image" ? "image-file" : "non-image-file"
                }`}
            isDraggingOver={props.isDraggingOver}
        >
            {type === "image" ? (
                <header style={bg} />
            ) : (
                <header>
                    <Asset type={type} className="file-type-icon" />
                </header>
            )}
            <section className="details">
                <main>
                    <Heading className="filename">Title : {title}</Heading>
                    <Paragraph className="row">
                        <strong>File name:</strong> {file.fileName}
                    </Paragraph>
                    {type === "image" ? (
                        <Paragraph className="row">
                            <strong>Dimensions:</strong> {file.details.image.width}x
                            {file.details.image.height}
                        </Paragraph>
                    ) : null}
                    <Paragraph className="row">
                        <strong>Size:</strong> {prettySize}
                    </Paragraph>
                    <Paragraph className="row">
                        <strong>Type:</strong> {file.contentType}
                    </Paragraph>
                    <Paragraph className="row">
                        <strong>Status:</strong> {props.isPublished ? "Published" : "Draft"}
                    </Paragraph>
                </main>
                <nav className="buttonset">
                    <IconContainer>
                        <SvgTrash/>
                    </IconContainer>
                    <Button
                        buttonType="muted"
                        className="button"
                        onClick={props.onClickEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        buttonType="muted"
                        className="button"
                        onClick={props.onClickRemove}
                    >
                        Remove
                    </Button>
                    <Button
                        buttonType="muted"
                        className="button"
                        onClick={props.onClickReload}
                    >
                        Reload
                    </Button>
                </nav>
            </section>
        </Container>
    )
}