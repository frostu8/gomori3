# gomori3
big man gilbert's mod loader for OMORI.

## Preprocessor Notetags
To instruct the modloader on how to interpret your data, you can use
**preprocessor notetags**. These tags start with `<!` and end with `>`. You can
optionally give a notetag a value using the `:` separator. Here's an example:

```
# Set a flag using a preprocessor tag
<!flag>

# Set a value to a key using a preprocessor tag
<!key: value>

# Preprocessor notetags do not interfere with game notetags!
<OtherInnocentNotetag>
...
```

### `replace` tag
The `replace` tag is used to write over an existing vanilla model. If given no
id, it will replace the model with the same id as the new model.

```
# a generic item with id 21

# This replaces the item with ID 14, which is CANDY
<!replace: 14>

# Because this item's id is 21, this replaces the item at ID 21, which is WAFFLE
<!replace>
```

**`replace` should be used as sparingly as possible, as it creates conflicts
with mods trying to replace the same model.**
