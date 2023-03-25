import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faStrikethrough, faList, faListOl, faQuoteLeft, faRotateLeft, faRotateRight, faImage, faLink } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useCallback } from 'react';

const MenuBar = ({ editor }) => {

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            })
        }
    }

    if (!editor) {
        return null
    }
    

    return (
        <div className='textMenu'>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
                type='button'
                title='Undo'
            >
                <FontAwesomeIcon icon={faRotateLeft} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
                type='button'
                className='redo'
                title='redo'
            >
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
            <div className='divider'></div>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} 
                type='button'
                title='Heading'
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''} 
                type='button'
                title='Paragraph'
            >
                p
            </button>
            <div className='divider'></div>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
                type='button'
                title='Bold'
            >
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
                type='button'
                title='Italic'
            >
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : ''}
                type='button'
                title='Strikethrough'
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </button>

            <div className='divider'></div>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''} 
                type='button'
                title='Unordered List'
            >
                <FontAwesomeIcon icon={faList} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''} 
                type='button'
                title='Ordered List'
            >
                <FontAwesomeIcon icon={faListOl} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''} 
                type='button'
                title='Blockquote'
            >
                <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button 
                onClick={() => editor.chain().focus().setHorizontalRule().run()} 
                type='button'
                title='Horizontal Rule'
            >
                _
            </button>
            <div className='divider'></div>
            <button 
                onClick={addImage} 
                type='button'
                title='Image'
            >
                <FontAwesomeIcon icon={faImage} />
            </button>
            <button 
                onClick={setLink} 
                type='button' 
                className={editor.isActive('link') ? 'is-active' : ''}
                title='Hyperlink'
            >
                <FontAwesomeIcon icon={faLink} />
            </button>
            <button 
                id="add" 
                type='button' 
                onClick={addYoutubeVideo}
                title='Video'
            ><FontAwesomeIcon icon={faYoutube} /></button>
        </div>
    )
}

export default MenuBar;